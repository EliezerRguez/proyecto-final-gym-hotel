"""empty message

Revision ID: a7a0da3cc751
Revises: 8043034a6937
Create Date: 2021-10-24 17:50:14.087657

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a7a0da3cc751'
down_revision = '8043034a6937'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('booking', sa.Column('day', sa.Integer(), nullable=False))
    op.add_column('booking', sa.Column('hour', sa.Integer(), nullable=False))
    op.add_column('booking', sa.Column('minutes', sa.Integer(), nullable=False))
    op.add_column('booking', sa.Column('month', sa.Integer(), nullable=False))
    op.add_column('booking', sa.Column('year', sa.Integer(), nullable=False))
    op.add_column('stay', sa.Column('name', sa.String(length=120), nullable=False))
    op.add_column('stay', sa.Column('from_day', sa.Integer(), nullable=False))
    op.add_column('stay', sa.Column('to_day', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('stay', 'to_day')
    op.drop_column('stay', 'from_day')
    op.drop_column('stay', 'name')
    op.drop_column('booking', 'year')
    op.drop_column('booking', 'month')
    op.drop_column('booking', 'minutes')
    op.drop_column('booking', 'hour')
    op.drop_column('booking', 'day')
    # ### end Alembic commands ###